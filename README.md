# Browser-Minesweeper

#Project Description

I was planning to make a in-browser version of Minesweeper. Minesweeper is a single player game where the player is tasked with carefully placing a flag on all of the mines without revealing them. the game is made up of a board with unrevealed spaces that could be empty or contain a bomb. If a player clicks on a space containing a bomb, they lose. If a player clicks on an empty space a number is revealed that tells the player how many bombs are in the surrounding spaces. The game is won when the player reveals all the empty spaces and has flagged all of the bombs.

#Game Logic



MVP Criteria

1. add three difficulties (Beginner, Intermediate, Expert).
2. Creates a board with dimensions based on the difficulties (8x8, 16x16, 30x16).
3. adds a number of mines to the board based on the difficulties (10, 40, 99).
4. clicking on a space should reveal a number of nearby mines or end the game if the space is a mine.
5. right clicking should flag a space as a mine.
6. the player should win the game if they flag all of the mines.
7. there should be a timer that tracks how long it takes for the player to play the game.
8. if the player loses or wins the game, they should get a prompt to play again.

Post-MVP Plans

1. add a custom difficulty that allows the player to input the dimensions of the board and the amount of mines to add.
2. add themes ex. dark mode.
3. add sound effects