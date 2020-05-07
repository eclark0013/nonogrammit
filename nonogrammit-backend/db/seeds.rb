# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'database_cleaner'

DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

u1 = User.create(id: 1, username: "guest", password: "password")
u1.save

u2 = User.create(id: 2, username: "eric", password: "clark")
u2.save

u3 = User.create(id: 3, username: "joey", password: "clark")
u3.save

5.times do
    p = Puzzle.new
    p.add_info
    p.save
end


g1 = Game.create(user_id: 2, puzzle_id: 1, time: 1235)
g2 = Game.create(user_id: 2, puzzle_id: 2, time: 921)
g3 = Game.create(user_id: 2, puzzle_id: 3, time: 2074)
g4 = Game.create(user_id: 2, puzzle_id: 4, time: 3271)
g5 = Game.create(user_id: 2, puzzle_id: 5, time: 2414)


g6 = Game.create(user_id: 3, puzzle_id: 1, time: 1632)
g7 = Game.create(user_id: 3, puzzle_id: 3, time: 937)
g8 = Game.create(user_id: 3, puzzle_id: 5, time: 2194)

