class Puzzle < ApplicationRecord
    has_many :rows
    has_many :columns
end
