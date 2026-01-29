FactoryBot.define do
  factory :direction do
    position { Faker::Number.between( from: 1, to: 12 ) }
    step { Faker::Lorem.sentence( word_count: 3, supplemental: true, random_words_to_add: 4 ) }
  end
end