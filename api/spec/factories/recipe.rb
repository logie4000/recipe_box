FactoryBot.define do
  factory :recipe do
    title { Faker::Lorem.sentence(word_count: 2, supplemental: true, random_words_to_add: 2) }
    description { Faker::Lorem.sentence(word_count: 5, supplemental: true, random_words_to_add: 4) }
    note  { Faker::Lorem.sentence(word_count: 5, supplemental: true, random_words_to_add: 4) }
    image { Faker::File.file_name(dir: 'public/images', ext: 'jpg') }
  end
end