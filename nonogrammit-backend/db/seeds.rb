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
u1.current_puzzle = {id: 3}
u1.save

u2 = User.create(id: 2, username: "eric", password: "clark")
u2.current_puzzle = {id: 3}
u2.save

p = Puzzle.new
p.add_info
p.save