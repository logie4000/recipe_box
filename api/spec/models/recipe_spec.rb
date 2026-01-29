require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it { should have_many(:ingredients) }
  it { should have_many(:directions) }
  it { should validate_presence_of(:title) }
end
