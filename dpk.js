const crypto = require("crypto");


const checkCandidateHashKey = (candidate) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY; // covered
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
}

/**
 * Function to return the candidate hash key based on the event.
 * @param {*} event 
 * @returns {string | number} candidate
 */
const deterministicPartitionKey = (event) => {

  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey; // covered
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex"); // covered
    }
  }

  candidate = checkCandidateHashKey(candidate);

  return candidate;
};

module.exports = { deterministicPartitionKey, checkCandidateHashKey };