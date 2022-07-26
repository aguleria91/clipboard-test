const { deterministicPartitionKey } = require("./dpk");
const { checkCandidateHashKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the candidate if event has partion key", () => {
    const testEvent = {
      name: "user1",
      partitionKey: "check_this_key"
    }
    const trivialKey = deterministicPartitionKey(testEvent);
    expect(trivialKey).toBe(testEvent.partitionKey);
  });

  it("Returns the candidate if event is without partion key", () => {
    const testEvent = {
      name: "user1"
    }
    const stringifiedEvent = JSON.stringify(testEvent);

    const expectedTrivialKey = crypto.createHash("sha3-512").update(stringifiedEvent).digest("hex");
    const trivialKey = deterministicPartitionKey(testEvent);
    expect(trivialKey).toBe(expectedTrivialKey);
  });


});


describe("candidateHashKey", () => {
  it("Type check for the candidate ", () => {
    const candidate = 12453
    const stringifiedCandidate = JSON.stringify(candidate);

    const candidateKey = checkCandidateHashKey(candidate);
    console.log("candidateKey-", candidateKey)
    expect(candidateKey).toBe(stringifiedCandidate);
  });
})