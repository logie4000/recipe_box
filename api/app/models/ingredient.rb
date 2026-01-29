class Ingredient < ApplicationRecord
  belongs_to :recipe
  validates :value, :presence => true
end
