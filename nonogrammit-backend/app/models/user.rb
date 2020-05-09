class User < ApplicationRecord
    has_secure_password
    validates :username, {presence: true, uniqueness: true}
    has_many :games

    def completed_games_count
        self.games.where(status: "complete").size
    end

    def total_games_count
        self.games.size
    end
end
