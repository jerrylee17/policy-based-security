import requests
from requests.adapters import HTTPAdapter
from urllib3 import Retry


def _requests_retry(url, method, **kwargs):
    """Method for request retry"""
    retries = Retry(total=5, backoff_factor=1)
    s = requests.Session()
    s.mount("http://", HTTPAdapter(max_retries=retries))
    response = None
    if method in ["GET"]:
        kwargs["headers"] = {"Content-Type": "application/json"}
        response = s.request(method=method, url=url, **kwargs)
    return response


if __name__ == "__main__":
    for i in range(5):
        res = _requests_retry("localhost:5000", "GET")
        if res is None:
            print("Err")
