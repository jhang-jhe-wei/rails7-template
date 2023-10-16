# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect('/app')

  scope :app, as: :app do
    root to: 'frontends#app'
    get '*path', to: 'frontends#app'
  end

  namespace :api do
    resources :testes, only: [:index]
  end
end
