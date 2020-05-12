class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :puzzle_id
      t.integer :time
      t.string :shaded_squares, array: true, default: []
      t.string :status, default: "incomplete"

      t.timestamps
    end
  end
end
