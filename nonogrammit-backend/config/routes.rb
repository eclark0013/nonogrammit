Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/test', to: 'application#test'
  get '/puzzleInfo', to: 'puzzles#puzzleInfo'
  resources :users, only: [:create, :index]
  resources :puzzles
end
