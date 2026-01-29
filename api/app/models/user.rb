class User < ApplicationRecord
  has_many :recipes, :foreign_key => "author_id"

  validates :username, :presence => true, :uniqueness => true
  validates :username, :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "must be a valid email format!" }

end
