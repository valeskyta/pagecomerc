class Product < ActiveRecord::Base
  include ApplicationHelper

  mount_uploader :image, ImageUploader

  belongs_to :category

  has_many :product_orders
  has_many :orders, through: :product_orders

  has_many :carts
  has_many :users, through: :carts

  has_many :reviews, dependent: :destroy

  has_many :likes, as: :likable
  has_many :user_likes, through: :likes, source: :user

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :price, presence: true
  validates :stock, presence: true
  validates :category, presence: true

  geocoded_by :address ##geocode
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, if: ->(obj) {obj.address.present? && obj.address_changed? }
  after_validation :reverse_geocode, if: ->(obj) {obj.latitude.present? && obj.longitude.present? && (obj.latitude_changed? || obj.longitude_changed?)}

  default_scope { order(:id) }

  def update_stock (quantity)
    self.stock += quantity
    self.save
  end

end
