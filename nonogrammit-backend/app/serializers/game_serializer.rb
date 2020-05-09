class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :puzzle, :time 
end
