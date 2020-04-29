class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :time
      t.hstore :current_puzzle, default: {}, null: false
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
