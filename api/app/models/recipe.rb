class Recipe < ApplicationRecord
  belongs_to :author, :class_name => "User", :optional => true
  has_many :ingredients, :dependent => :destroy
  has_many :directions, :dependent => :destroy

end
