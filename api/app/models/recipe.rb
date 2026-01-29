class Recipe < ApplicationRecord
  belongs_to :author, :class_name => "User", :optional => true
  has_many :ingredients, :dependent => :destroy
  has_many :directions, :dependent => :destroy
  validates :title, :presence => true

  accepts_nested_attributes_for :ingredients, :allow_destroy => true
  accepts_nested_attributes_for :directions, :allow_destroy => true
end
