class UserSerializer
    # accepts_nested_attributes_for :current_puzzle
    
    include FastJsonapi::ObjectSerializer
    attributes :username, :id, :current_puzzle
end
  