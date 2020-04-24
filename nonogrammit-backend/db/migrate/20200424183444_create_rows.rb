class CreateRows < ActiveRecord::Migration[6.0]
  def change
    create_table :rows do |t|
      t.integer :parameters, array: true, default: []
      t.integer :completion_status
      t.integer :puzzle_location
      t.references :puzzle

      t.timestamps
    end
  end
end
