FROM python:3.11

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /api
COPY ./requirements.txt /api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt
COPY . /api
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"] && ["rq", "worker", "-c", "settings"]

