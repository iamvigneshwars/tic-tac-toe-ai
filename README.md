##  How does it work? 

This project is built using vanilla JavaScript. The AI uses a minimax algorithm to search all the possible game states and chooses the optimal move assuming that the opponent also plays optimally. The minimax function is recursive in which the maximizer tries to get the highest score possible while the minimizer tries to get the lowest score possible. The scores are calculated at the terminal game states (player win : -10, AI win : 10 or tie : 0). In this case, AI is the maximizing player that tries to maximize the score. The number of empty cells at terminal conditions are multiplied with the score, this makes algorithm to search for terminal states with minimal moves.

## Demo
<p align="center">
  <img src="/static/demo.gif" alt="animated" />
</p>

[Play the Game](https://iamvigneshwars.github.io/tic-tac-toe-ai/)

## Future Improvements

- Limit the depth of MiniMax Search.
- Add Aplha Beta pruning to prune unwanted branches.