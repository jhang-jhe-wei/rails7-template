# frozen_string_literal: true

When('I visit {string}') do |url|
  visit url
end

Then('I can see {string}') do |text|
  expect(page).to(have_content(text))
end
