FactoryBot.define do
  factory :ingredient do
    position { Faker::Number.between( from: 1, to: 12 ) }
    value { Faker::Lorem.sentence(word_count: 1, supplemental: true, random_words_to_add: 4) }
  end
end