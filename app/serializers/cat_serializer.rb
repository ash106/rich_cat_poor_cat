class CatSerializer < ActiveModel::Serializer
  attributes :finances, :x, :y, :radius, :image_url

  def image_url
    object.image.url(:medium)
  end
end
