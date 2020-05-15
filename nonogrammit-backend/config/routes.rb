Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :create, :update]
  resources :puzzles, only: [:index, :show, :create]
  resources :games, only: [:index, :show, :create, :update]
  
end
