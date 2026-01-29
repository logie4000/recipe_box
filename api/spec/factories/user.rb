FactoryBot.define do
  factory :user do
    username { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    roles  { 0 }
    last_login { Faker::Time.between(from: DateTime.now - 180.days, to: DateTime.now - 10.days)  }
  end
end