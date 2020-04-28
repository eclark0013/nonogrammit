class PuzzleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :column_parameters, :row_parameters, :column_max, :row_max, :solution
end
