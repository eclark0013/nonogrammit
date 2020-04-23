class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :password, :user_id
  end
  