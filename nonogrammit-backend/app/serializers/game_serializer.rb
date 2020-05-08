class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :puzzle_id, :time, :user
end
