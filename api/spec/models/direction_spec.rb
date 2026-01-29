require 'rails_helper'

RSpec.describe Direction, type: :model do
  it { should belong_to(:recipe) }
  it { should validate_presence_of(:step) }
end
