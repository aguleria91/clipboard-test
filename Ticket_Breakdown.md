# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Functionality to add Custom Ids for each Agent.

1. Add a Custom Id field in the Agent table schema.
   **Acceptance Criteria - The custom Id for each agent should be unique**  
   **Time estimate - 1 hour**
   **Implementation - Run the below query if it's a sql database**
   ```
   ALTER TABLE Agent customId int UNIQUE;
   ```
2. Functionality to save/update custom ID for a Agent belonging to a facility.
   **Acceptance Criteria - The facility should only be allowed to save/update custom id for Agent's they work with**  
   **Time estimate - 4 hours**
   **Implementation**
   - Update existing Create and Update endpoints for Agent to take in custom id.
   - Include custom id in create and update DB query.
3. Update the `getShiftsByFacility` function to respond with custom Id in the Agent's metadata.
   **Acceptance Criteria - The function should respond with a custom Id(if exists) in the Agent's metadata**  
   **Time estimate - 1 day**
   **Implementation**
   - Include the custom Id in the select statement of the DB query.
   - Include the custom Id in the response type of the function.
4. Update the `generateReport` to be called with a list of Agents custom Id to generate a report.
   **Acceptance Criteria - The function should respond with a custom Id(if exists) in the Agent's metadata**  
   **Time estimate - 1 day**
   **Implementation**
   - Replace the function's argument with an array of Agent's custom ids.
   - Replace the internal id of Agent with new custom id in the PDF generator.
