class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user)
    end

    def edit
        # raise "edit".inspect
    end

    def update
        user = User.find(params[:id])
        user.current_puzzle = params[:current_puzzle]
        user.save
        render json: UserSerializer.new(user)
    end

    def create #find or create a new user
        if User.find_by(username: user_params["username"])
            user = User.find_by(username: user_params["username"]).authenticate(params["password"])
        else
            user = User.new(username: user_params["username"])
            user.password = params["password"]
            user.save
        end
        if user
            if user.valid?
                render json: UserSerializer.new(user)
            else # you set a user, but that user is not valid
                render json: {message: "Invalid entry for new user (both username and password required)."}
            end
        else # you found a true username but have the wrong password for it
            render json: {message: "Invalid entry for returning user (username already taken/incorrect password)."}
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, current_puzzle: [:id, :shaded])
    end
end
