import sys
import os
import requests
import operator
import re
import nltk
import json
from flask import Flask, render_template, request, jsonify
from extensions import db
from stop_words import stops
from collections import Counter
from bs4 import BeautifulSoup
from models import Result

from rq import Queue
from rq.job import Job
from worker import conn


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

q = Queue(connection=conn)

from models import Result

def count_and_save_words(url):

    errors = []

    try:
        r = requests.get(url)
    except:
        errors.append(
            "Unable to get URL. Please make sure it's valid and try again."
        )
        return {"error": errors}

    # text processing
    raw = BeautifulSoup(r.text).get_text()
    nltk.data.path.append('./nltk_data/')  # set the path
    tokens = nltk.word_tokenize(raw)
    text = nltk.Text(tokens)

    print("text received")
    sys.stdout.flush()
    # remove punctuation, count raw words
    nonPunct = re.compile('.*[A-Za-z].*')
    raw_words = [w for w in text if nonPunct.match(w)]
    raw_word_count = Counter(raw_words)

    # stop words
    no_stop_words = [w for w in raw_words if w.lower() not in stops]
    no_stop_words_count = Counter(no_stop_words)

    # save the results
    try:
        with app.app_context():
            print("inside context")
            result = Result(
                url=url,
                result_all=raw_word_count,
                result_no_stop_words=no_stop_words_count
            )
            db.session.add(result)
            db.session.commit()
            return result.id
    except Exception as e:
        # errors.append("Unable to add item to database.")
        errors.append(e)
        return {"error": errors}


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def get_counts():
    print("start was called")
    sys.stdout.flush()
    # this import solves a rq bug which currently exists
    from app import count_and_save_words

    # get url that the person has entered
    data = json.loads(request.data.decode())
    url = data['url']
    if not url[:8].startswith(('https://', 'http://')):
        url = 'http://' + url
    job = q.enqueue_call(
        func=count_and_save_words, args=(url,), result_ttl=5000
    )

    # return created job id
    return {"id": job.get_id()}


@app.route('/results/<job_key>', methods=['GET'])
def get_results(job_key):
    job = Job.fetch(job_key, connection=conn)
    
    if job.is_finished:
        result = Result.query.filter_by(id=job.result).first()
        results = sorted(
            result.result_no_stop_words.items(),
            key=operator.itemgetter(1),
            reverse=True
        )[:25]
        return jsonify(results)
    else:
        return job.get_status(), 202

if __name__ == '__main__':
    app.run()
