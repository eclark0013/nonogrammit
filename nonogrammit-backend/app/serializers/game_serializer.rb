class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user, :puzzle, :time, :shaded_squares, :status 
end
