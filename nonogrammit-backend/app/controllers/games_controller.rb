class GamesController < ApplicationController
    def show
        game = Game.find(params[:id])
        render json: GameSerializer.new(game)
    end

end
