class User < ActiveRecord::Base
  has_secure_password
  before_save { self.email = email.downcase }
  before_create :create_remember_token

  validates :username, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, 
                    format: { with: VALID_EMAIL_REGEX }
  validates_uniqueness_of :email, :case_sensitive => false 
  has_secure_password
  validates :password, length: { minimum: 6 }

  #this helps keep a user logged in until they logout even if they close the browser.
  #this stores a hash digest in the database of 16 charaters (64 combination 64 base64)
  #this allows to signin a user with  by retrieving a token from the cookie, calculating 
  #the hash digest and searching for the remember token matching the digests value.
  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  private

    def create_remember_token
      self.remember_token = User.digest(User.new_remember_token) 
    end
    
end