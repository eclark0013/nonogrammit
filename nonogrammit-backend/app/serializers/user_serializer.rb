class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :username, :games, :completed_games_count, :total_games_count, :fastest_game
end
  