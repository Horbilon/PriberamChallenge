# Challenge - Priberam Interview


## The Challenge:
  	
  	In this task it's required to write a user interface to annotate text with a set of tags.
  	The user will be able to copy and paste any text into the GUI, select any span of characters, and mark their selection with one or more tags from a list of possible  tags.
  	The possible tags are: ["Person", "Organization", "Place", "Event"]. Tags can span more than one word. Tags may overlap with eachother (For example, an "Event" tag may include people and organization tags within it - "George W. Bush went to Paris" - in this exemple, the entire sentence is an "Event", George W. Bush a "Person" and Paris a "Place").

  	The interface must have a way for the user insert a new text and start working.
  	At any moment the user can save the work, close the browser and resume later.

  	The system should save the result with the following json structure:

		  ```json
		  const data = {
			"text": "...full text",
			"tags": {
			  "Person": [
				{
				  "start": <start_index>,
				  "end": <end_index>
				}
			  ]
			}
		  }
		  ```

  	Where inside the "tags" object, there's an entry for each tag type containing a list with all span annotations (The above example shows one span with tag "Person"). The values of start_idx and end_idx are the position in the text of the starting character and end character of each span, respectively.

	## Remarks

	- Although not required in this challenge, take into consideration that in the future the data would be stored on a server.
	- Remeber that tags may overlap with eachother (see example in the beggining).
	- You are free to use any framework and language you want.
	- The application should be able to run offline (every library used must be included on the project).
	- We will test the challenge with Google Chrome.
	- Your focus should be on functionality however we will also evaluate design and user experience.
	- You need to provide instructions on how to build, deploy and run the project.
	- Good Luck !

## Built with:

- HTML/CSS
- JavaScript
- jQuery

## How to access the website:

- Clone repository and open index.html in a browser


OR
- Clone repository and serve locally to access in localhost


OR
- Using Apache, clone repository to /var/www/html and access index.html

## How to use:

1. Write text in the *Start Card* and press *Start*;
2. In the *textarea* below will appear the text entered, select parts of the text relavant to create a entry;
3. The *Entry Table* below, atribute a tag that fits your entry or delete it, if you dont intend in using it;
4. *Save Project* will write your text to a .json file, safeguarding your text and tags, you will be given a *Work ID* to use later;
5. To return to your previous project, select the *Work ID* from  the drop-down list, in the *Continue Card*.

Project Link: https://github.com/Horbilon/PriberamChallenge
