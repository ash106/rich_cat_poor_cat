class WelcomeController < ApplicationController
  def index
    @cats = ActiveModelSerializers::SerializableResource.new(Cat.all)
  end
end
