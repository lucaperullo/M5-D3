export const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send("We can't find what you're looking for!");
  }
  next(err);
};

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).send("GTFO, you aren't authourized for this shit.");
  }
  next(err);
};

export const forbiddenHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(403).send("THESE ARE THE FORBIDDEN TEXTS");
  }
  next(err);
};

export const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err.message);
  }
  next(err);
};

export const catchAllHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    res.status(500).send("We don't know whats gone wrong");
  }
};
