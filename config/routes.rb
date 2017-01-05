Rails.application.routes.draw do
  resources :cats
  root 'welcome#index'
end
