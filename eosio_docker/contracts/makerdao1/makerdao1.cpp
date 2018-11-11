#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;


// Smart Contract Name: notechain
// Table struct:
//   notestruct: multi index table to store the notes
//     prim_key(uint64): primary key
//     user(name): account name for the user
//     note(string): the note message
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has note in table or not
// Public actions:
//   update => put the note into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
CONTRACT makerdao1 : public eosio::contract {
  private:
    bool isnewuser( name user ) {
      // get notes by using secordary key
      auto token_index = _token_maker.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      return token_iterator == token_index.end();
    }

    bool isnewuserinit( name user ) {
      // get notes by using secordary key
      auto token_index = _token_balance.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      return token_iterator == token_index.end();
    }

    void subbalance(name user, int value) {
      auto token_index = _token_balance.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      if (token_iterator != token_index.end()) {
        auto token_index = _token_balance.get_index<name("getbyuser")>();
        auto &token_entry = token_index.get(user.value);
        _token_balance.modify( token_entry, _self, [&]( auto& modified_user ) {
          modified_user.balance      = modified_user.balance - value;
        });
      }
    }

    void addbalance(name user, int value) {
      auto token_index = _token_balance.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      if (token_iterator != token_index.end()) {
        auto token_index = _token_balance.get_index<name("getbyuser")>();
        auto &token_entry = token_index.get(user.value);
        _token_balance.modify( token_entry, _self, [&]( auto& modified_user ) {
          modified_user.balance      = modified_user.balance + value;
        });
      }
    }

    void subtoken(name user, int profit) {
      // to do: need to protect underflow problem
      auto token_index = _token_maker.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      if (token_iterator != token_index.end()) {
        auto token_index = _token_maker.get_index<name("getbyuser")>();
        auto &token_entry = token_index.get(user.value);
        _token_maker.modify( token_entry, _self, [&]( auto& modified_user ) {
          modified_user.profit      = modified_user.profit - profit;
        });
      }
    }

    void addtoken(name user, int profit) {
      // create new / update note depends whether the user account exist or not
       if (isnewuser(user)) {
         // insert new token
         _token_maker.emplace( _self, [&]( auto& new_user ) {
           new_user.prim_key    = _token_maker.available_primary_key();
           new_user.user        = user;
           new_user.profit        = profit;
         });
       } else {
         // get object by secordary key
         auto token_index = _token_maker.get_index<name("getbyuser")>();
         auto &token_entry = token_index.get(user.value);
         // update existing note
         _token_maker.modify( token_entry, _self, [&]( auto& modified_user ) {
         modified_user.profit      = profit + modified_user.profit;
         });
       }
    }

    TABLE tokenmaker {
      uint64_t      prim_key;  // primary key
      name          user;      // account name for the user
      int         profit;      // the profit

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      // only supports uint64_t, uint128_t, uint256_t, double or long double
      uint64_t get_by_user() const { return user.value; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("tokenmaker"), tokenmaker,
      indexed_by< name("getbyuser"), const_mem_fun<tokenmaker, uint64_t, &tokenmaker::get_by_user> >
      > token_maker_table;

    token_maker_table _token_maker;


    TABLE tokenbalance {
      uint64_t      prim_key;  // primary key
      name          user;      // account name for the user
      int         balance;      // balance

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      // only supports uint64_t, uint128_t, uint256_t, double or long double
      uint64_t get_by_user() const { return user.value; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("tokenbalance"), tokenbalance,
      indexed_by< name("getbyuser"), const_mem_fun<tokenbalance, uint64_t, &tokenbalance::get_by_user> >
      > token_balance_table;

    token_balance_table _token_balance;

    void initbalance(name user) {
      // if user has not been inited yet, then grant them some default balance
      auto token_index = _token_balance.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      // create new / update note depends whether the user account exist or not
      auto init_balance = 100;
      if (isnewuserinit(user)) {
        _token_balance.emplace( _self, [&]( auto& new_user ) {
          new_user.prim_key    = _token_balance.available_primary_key();
          new_user.user        = user;
          new_user.balance     = init_balance;
        });
      }
    }

  public:
    using contract::contract;

    // constructor
    makerdao1 ( name receiver, name code, datastream<const char*> ds ):
                contract( receiver, code, ds ),
                _token_maker( receiver, receiver.value ),
                _token_balance(receiver, receiver.value) {}

    ACTION vote(name user, int balance) {
      require_auth(user);
      initbalance(user);
      auto token_index = _token_maker.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      const auto& st = *token_iterator;

      auto token_balance_index = _token_balance.get_index<name("getbyuser")>();
      auto token_balance_iterator = token_balance_index.find(user.value);
      const auto& st_balance = *token_balance_iterator;

      eosio_assert( st_balance.balance >= balance, "insufficient quantity" );

      // assume token price : balnce price = 1: 1 for now
      auto token = balance;

      subbalance(user, balance);
      addtoken(user, token);
    }

    ACTION getprofit(name user, int total_profit) {
      require_auth(user);
      auto token_index = _token_maker.get_index<name("getbyuser")>();
      auto token_iterator = token_index.find(user.value);
      auto token = 0;
      auto total_token = 0;
      for (auto ptr = _token_maker.begin(); ptr != _token_maker.end(); ptr++) {
        total_token += ptr->profit;
        if (ptr->user == user) {
          token += ptr->profit;
        }
      }
      //based on percentage of voting, decide what is the profit is
      auto profit = total_profit * token / total_token;
      subtoken(user, token);
      // assume the convertion rate of balance : token = 1:1 for first version
      auto converted_balance = token;
      addbalance(user, converted_balance + profit);
    }

};

// specify the contract name, and export a public action: update
EOSIO_DISPATCH( makerdao1, (vote)(getprofit) )
