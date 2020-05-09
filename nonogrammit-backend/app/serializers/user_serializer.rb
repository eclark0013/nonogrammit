class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :id, :current_puzzle, :games, :completed_games_count, :total_games_count
end
  