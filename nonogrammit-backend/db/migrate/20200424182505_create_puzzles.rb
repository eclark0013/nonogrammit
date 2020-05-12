class CreatePuzzles < ActiveRecord::Migration[6.0]
  def change
    create_table :puzzles do |t|
      t.string :solution, array: true, default: []
      t.hstore :column_params, default: {}, null: false
      t.hstore :row_params, default: {}, null: false
      t.timestamps
    end
  end
end
