class PuzzleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :column_params, :row_params, :column_max, :row_max, :solution
end
