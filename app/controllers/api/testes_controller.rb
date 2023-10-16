# frozen_string_literal: true

module Api
  class TestesController < ActionController::API
    def index
      @message = 'Hello World'
    end
  end
end
