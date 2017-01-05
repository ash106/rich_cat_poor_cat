class Cat < ApplicationRecord
  enum finances: [ :rich, :poor ]
  
  has_attached_file :image, styles: {
    thumb: '100x100>',
    medium: '400x400>'
  }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
