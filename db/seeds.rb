# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

cat = Cat.new(finances: "rich", x: 241, y: 267, radius: 35)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'rich_cat_1.jpg'))
cat.save!

cat = Cat.new(finances: "rich", x: 212, y: 65, radius: 65)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'rich_cat_2.jpg'))
cat.save!

cat = Cat.new(finances: "rich", x: 213, y: 175, radius: 60)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'rich_cat_3.jpg'))
cat.save!

cat = Cat.new(finances: "rich", x: 160, y: 165, radius: 37)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'rich_cat_4.jpg'))
cat.save!

cat = Cat.new(finances: "rich", x: 68, y: 185, radius: 55)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'rich_cat_5.jpg'))
cat.save!

cat = Cat.new(finances: "poor", x: 328, y: 197, radius: 75)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'poor_cat_1.jpg'))
cat.save!

cat = Cat.new(finances: "poor", x: 105, y: 225, radius: 98)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'poor_cat_2.jpg'))
cat.save!

cat = Cat.new(finances: "poor", x: 232, y: 107, radius: 55)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'poor_cat_3.jpg'))
cat.save!

cat = Cat.new(finances: "poor", x: 157, y: 196, radius: 81)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'poor_cat_4.jpg'))
cat.save!

cat = Cat.new(finances: "poor", x: 158, y: 85, radius: 47)
cat.image = File.new(Rails.root.join('app', 'assets', 'images', 'poor_cat_5.jpg'))
cat.save!
