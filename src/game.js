import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss'
import { CSSTransition } from 'react-transition-group'
import {Row,Col,Container} from 'react-bootstrap'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AddNewResults,GetAllResults } from './actions/ResultsActions';
import startAudioUrl from './assets/audio/mixkit-software-interface-back-2575.wav'
import endAudioUrl from './assets/audio/mixkit-software-interface-remove-2576.wav'
import correctAudioUrl from './assets/audio/mixkit-software-interface-start-2574.wav'
import wrongAudioUrl from './assets/audio/mixkit-software-interface-start-2574.wav'


class GameComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gameStart: false,
      activeSelectedWord: [],
      activeLetters: [],
      wordsMastered: 0,
      timer: 0,
      level:1,
      wordList: [],
      font: 'sans',
      play: false
    }
    this.getWordsList = this.getWordsList.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.getWord = this.getWord.bind(this);
    this.checkEqual = this.checkEqual.bind(this);
    this.timer = this.timer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.rating = this.rating.bind(this);
    this.switchFonts = this.switchFonts.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.toggleWrongPlay=this.toggleWrongPlay.bind(this);
    // this.interval;
  }

  startAudio = new Audio(startAudioUrl)
  EndAudio = new Audio(endAudioUrl)
  correctAudio = new Audio(correctAudioUrl)
  wrongAudio = new Audio(wrongAudioUrl)

  toggleStarPlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.startAudio.play() : this.startAudio.pause();
    });
  }

  toggleEndPlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.EndAudio.play() : this.EndAudio.pause();
    });
  }

  toggleWrongPlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.wrongAudio.play() : this.wrongAudio.pause();
    });
  }

  toggleCorrectPlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.correctAudio.play() : this.EndAudio.pause();
    });
  }

  

  componentDidMount() {
    this.startAudio.addEventListener('ended', () => this.setState({ play: false }));
    this.EndAudio.addEventListener('ended', () => this.setState({ play: false }));
    this.correctAudio.addEventListener('ended', () => this.setState({ play: false }));
    this.wrongAudio.addEventListener('ended', () => this.setState({ play: false }));
  }

  componentWillMount(){

    this.startAudio.addEventListener('ended', () => this.setState({ play: false }));
    this.EndAudio.addEventListener('ended', () => this.setState({ play: false }));
    this.correctAudio.addEventListener('ended', () => this.setState({ play: false }));
    this.wrongAudio.addEventListener('ended', () => this.setState({ play: false }));

      
    document.addEventListener('keydown', function(e) {
      e.preventDefault();
      
      // handle backspace and delete
      if(e.which == 46 || e.which == 8){
        this.setState({
          activeLetters: this.state.activeLetters.slice(0,-1)
        })
        return true;
      }
      
      
      // otherwise add character to array
      let char = String.fromCharCode(e.which);
      let newActiveLetters = this.state.activeLetters;
      newActiveLetters.push(char);
      if(this.checkEqual(newActiveLetters, this.state.activeSelectedWord) ){
        this.setState({
          activeSelectedWord: this.getWord(),
          activeLetters: [],
          wordsMastered: this.state.wordsMastered + 1
        })
      }
      else{
        this.setState({
          activeLetters: newActiveLetters
        })
      }

      if(this.state.wordsMastered === 10 && this.state.level===1){
        this.setState({ level: 2});
      }

      if(this.state.wordsMastered === 20 && this.state.level===2){
        this.setState({ level: 3});
        this.startGame()
      }

      if(this.state.wordsMastered === 30&& this.state.level===3){
        this.setState({ level: 4});
        this.startGame()
      }

      if(this.state.wordsMastered === 40&& this.state.level===4){
        this.setState({ level: 5});
        this.startGame()
      }

    }.bind(this));
  }
  
  checkEqual(arr1, arr2) {
      if(arr1.length !== arr2.length)
          return false;
      for(var i = arr1.length; i--;) {
          if(arr1[i] !== arr2[i])
              return false;
      }
      this.toggleCorrectPlay()
      return true;
  }
  
  getRandomInt(min=0, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  
  timer(){
    let newTime = this.state.timer - 1;
    this.setState({
      timer: newTime
    })
    if(newTime === 0){
      this.toggleEndPlay()
      window.clearInterval(this.interval); 
    }
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { wordsMastered,level } = this.state;
    const savedData = {
      score:wordsMastered,
      level:level,
    };
    const { AddNewResults,GetAllResults } = this.props;

    this.setState({ isLoading: true });

    await AddNewResults(savedData);
    await GetAllResults();
  };

  
  
  rating(){
    if(this.state.wordsMastered < 10){
      return '😫'
      
    }
    else if(this.state.wordsMastered < 20){
      return '😐'
    }
    else if(this.state.wordsMastered < 30){
      return '😊'
    }
    else if(this.state.wordsMastered < 40){
      return '😃'
    }
    else{
      return '😎'
    }
  }
  
  startGame(){
      this.setState({
        wordList: this.getWordsList()
      }, function(){
        let word = this.getWord();
        this.setState({
          activeSelectedWord: this.getWord(),
          gameStart: true,
          wordsMastered: 0,
          timer: 60
        });      
      });
      
      ReactDOM.findDOMNode(this).querySelector('.secret-input').focus();
      this.toggleStarPlay();
      this.interval = setInterval(this.timer, 1000);
      
  }
  
  getWord(){
    let index = this.getRandomInt(0, this.state.wordList.length);
    let wordToUse = this.state.wordList[index];
    let newWordsList = this.state.wordList;
    newWordsList.splice(index, 1);
    this.setState({
      wordList: newWordsList
    });
    
    return wordToUse.split('');
  }  
  
  switchFonts(){
    if(this.state.font === 'sans'){
      document.getElementById('app').classList.add('serif');  
      this.setState({
        font: 'serif'
      });
    }
    else{
      document.getElementById('app').classList.remove('serif');  
      this.setState({
        font: 'sans'
      });
    }
    
  }
  getWordsList(){
    const list = ['ACCOUNT','ACCURATE','ACRES','ACROSS','ACT','ACTION','ACTIVE','ACTIVITY',
  'ACTUAL','ACTUALLY','ADD','ADDITION','ADDITIONAL','ADJECTIVE','ADULT','ADVENTURE',
  'ADVICE','AFFECT','AFRAID','AFTER','AFTERNOON','AGAIN','AGAINST','AGE',
  'AGO','AGREE','AHEAD','AID','AIR','AIRPLANE','ALIKE','ALIVE',
  'ALL','ALLOW','ALMOST','ALONE','ALONG','ALOUD','ALPHABET','ALREADY',
  'ALSO','ALTHOUGH','AM','AMONG','AMOUNT','ANCIENT','ANGLE','ANGRY',
  'ANIMAL','ANNOUNCED','ANOTHER','ANSWER','ANTS','ANY','ANYBODY','ANYONE',
  'ANYTHING','ANYWAY','ANYWHERE','APART','APARTMENT','APPEARANCE','APPLE','APPLIED',
  'APPROPRIATE','ARE','AREA','ARM','ARMY','AROUND','ARRANGE','ARRANGEMENT',
  'ARRIVE','ARROW','ART','ARTICLE','AS','ASIDE','ASK','ASLEEP',
  'AT','ATE','ATMOSPHERE','ATOM','ATOMIC','ATTACHED','ATTACK','ATTEMPT',
  'ATTENTION','AUDIENCE','AUTHOR','AUTOMOBILE','AVAILABLE','AVERAGE','AVOID','AWARE',
  'AWAY','BABY','BACK','BAD','BADLY','BAG','BALANCE','BALL',
  'BALLOON','BAND','BANK','BAR','BARE','BARK','BARN','BASE',
  'BASEBALL','BASIC','BASIS','BASKET','BAT','BATTLE','BE','BEAN',
  'BEAR','BEAT','BEAUTIFUL','BEAUTY','BECAME','BECAUSE','BECOME','BECOMING',
  'BEE','BEEN','BEFORE','BEGAN','BEGINNING','BEGUN','BEHAVIOR','BEHIND',
  'BEING','BELIEVED','BELL','BELONG','BELOW','BELT','BEND','BENEATH',
  'BENT','BESIDE','BEST','BET','BETTER','BETWEEN','BEYOND','BICYCLE',
  'BIGGER','BIGGEST','BILL','BIRDS','BIRTH','BIRTHDAY','BIT','BITE',
  'BLACK','BLANK','BLANKET','BLEW','BLIND','BLOCK','BLOOD','BLOW',
  'BLUE','BOARD','BOAT','BODY','BONE','BOOK','BORDER','BORN',
  'BOTH','BOTTLE','BOTTOM','BOUND','BOW','BOWL','BOX','BOY',
  'BRAIN','BRANCH','BRASS','BRAVE','BREAD','BREAK','BREAKFAST','BREATH',
  'BREATHE','BREATHING','BREEZE','BRICK','BRIDGE','BRIEF','BRIGHT','BRING',
  'BROAD','BROKE','BROKEN','BROTHER','BROUGHT','BROWN','BRUSH','BUFFALO',
  'BUILD','BUILDING','BUILT','BURIED','BURN','BURST','BUS','BUSH',
  'BUSINESS','BUSY','BUT','BUTTER','BUY','BY','CABIN','CAGE',
  'CAKE','CALL','CALM','CAME','CAMERA','CAMP','CAN','CANAL',
  'CANNOT','CAP','CAPITAL','CAPTAIN','CAPTURED','CAR','CARBON','CARD',
  'CARE','CAREFUL','CAREFULLY','CARRIED','CARRY','CASE','CAST','CASTLE',
  'CAT','CATCH','CATTLE','CAUGHT','CAUSE','CAVE','CELL','CENT',
  'CENTER','CENTRAL','CENTURY','CERTAIN','CERTAINLY','CHAIN','CHAIR','CHAMBER',
  'CHANCE','CHANGE','CHANGING','CHAPTER','CHARACTER','CHARACTERISTIC','CHARGE','CHART',
  'CHECK','CHEESE','CHEMICAL','CHEST','CHICKEN','CHIEF','CHILD','CHILDREN',
  'CHOICE','CHOOSE','CHOSE','CHOSEN','CHURCH','CIRCLE','CIRCUS','CITIZEN',
  'CITY','CLASS','CLASSROOM','CLAWS','CLAY','CLEAN','CLEAR','CLEARLY',
  'CLIMATE','CLIMB','CLOCK','CLOSE', 'CLOSET', 'CLOSELY','CLOSER','CLOTH','CLOTHES',
  'CLOTHING','CLOUD','CLUB','COACH','COAL','COAST','COAT','CODEPEN','COFFEE',
  'COLD','COLLECT','COLLEGE','COLONY','COLOR','COLUMN','COMBINATION','COMBINE',
  'COME','COMFORTABLE','COMING','COMMAND','COMMON','COMMUNITY','COMPANY','COMPARE',
  'COMPASS','COMPLETE','COMPLETELY','COMPLEX','COMPOSED','COMPOSITION','COMPOUND','CONCERNED',
  'CONDITION','CONGRESS','CONNECTED','CONSIDER','CONSIST','CONSONANT','CONSTANTLY','CONSTRUCTION',
  'CONTAIN','CONTINENT','CONTINUED','CONTRAST','CONTROL','CONVERSATION','COOK','COOKIES',
  'COOL','COPPER','COPY','CORN','CORNER','CORRECT','CORRECTLY','COST',
  'COTTON','COULD','COUNT','COUNTRY','COUPLE','COURAGE','COURSE','COURT',
  'COVER','COW','COWBOY','CRACK','CREAM','CREATE','CREATURE','CREW',
  'CROP','CROSS','CROWD','CRY','CUP','CURIOUS','CURRENT','CURVE',
  'CUSTOMS','CUT','CUTTING','DAILY','DAMAGE','DANCE','DANGER','DANGEROUS',
  'DARK','DARKNESS','DATE','DAUGHTER','DAWN','DAY','DEAD','DEAL',
  'DEAR','DEATH','DECIDE','DECLARED','DEEP','DEEPLY','DEER','DEFINITION',
  'DEGREE','DEPEND','DEPTH','DESCRIBE','DESERT','DESIGN','DESK','DETAIL',
  'DETERMINE','DEVELOP','DEVELOPMENT','DIAGRAM','DIAMETER','DID','DIE','DIFFER',
  'DIFFERENCE','DIFFERENT','DIFFICULT','DIFFICULTY','DIG','DINNER','DIRECT','DIRECTION',
  'DIRECTLY','DIRT','DIRTY','DISAPPEAR','DISCOVER','DISCOVERY','DISCUSS','DISCUSSION',
  'DISEASE','DISH','DISTANCE','DISTANT','DIVIDE','DIVISION','DO','DOCTOR',
  'DOES','DOG','DOING','DOLL','DOLLAR','DONE','DONKEY','DOOR',
  'DOT','DOUBLE','DOUBT','DOWN','DOZEN','DRAW','DRAWN','DREAM',
  'DRESS','DREW','DRIED','DRINK','DRIVE','DRIVEN','DRIVER','DRIVING',
  'DROP','DROPPED','DROVE','DRY','DUCK','DUE','DUG','DULL',
  'DURING','DUST','DUTY','EACH','EAGER','EAR','EARLIER','EARLY',
  'EARN','EARTH','EASIER','EASILY','EAST','EASY','EAT','EATEN',
  'EDGE','EDUCATION','EFFECT','EFFORT','EGG','EIGHT','EITHER','ELECTRIC',
  'ELECTRICITY','ELEMENT','ELEPHANT','ELEVEN','ELSE','EMPTY','END','ENEMY',
  'ENERGY','ENGINE','ENGINEER','ENJOY','ENOUGH','ENTER','ENTIRE','ENTIRELY',
  'ENVIRONMENT','EQUAL','EQUALLY','EQUATOR','EQUIPMENT','ESCAPE','ESPECIALLY','ESSENTIAL',
  'ESTABLISH','EVEN','EVENING','EVENT','EVENTUALLY','EVER','EVERY','EVERYBODY',
  'EVERYONE','EVERYTHING','EVERYWHERE','EVIDENCE','EXACT','EXACTLY','EXAMINE','EXAMPLE',
  'EXCELLENT','EXCEPT','EXCHANGE','EXCITED','EXCITEMENT','EXCITING','EXCLAIMED','EXERCISE',
  'EXIST','EXPECT','EXPERIENCE','EXPERIMENT','EXPLAIN','EXPLANATION','EXPLORE','EXPRESS',
  'EXPRESSION','EXTRA','EYE','FACE','FACING','FACT','FACTOR','FACTORY',
  'FAILED','FAIR','FAIRLY','FALL','FALLEN','FAMILIAR','FAMILY','FAMOUS',
  'FAR','FARM','FARMER','FARTHER','FAST','FASTENED','FASTER','FAT',
  'FATHER','FAVORITE','FEAR','FEATHERS','FEATURE','FED','FEED','FEEL',
  'FEET','FELL','FELLOW','FELT','FENCE','FEW','FEWER','FIELD',
  'FIERCE','FIFTEEN','FIFTH','FIFTY','FIGHT','FIGHTING','FIGURE','FILL',
  'FILM','FINAL','FINALLY','FIND','FINE','FINEST','FINGER','FINISH',
  'FIRE','FIREPLACE','FIRM','FIRST','FISH','FIVE','FIX','FLAG',
  'FLAME','FLAT','FLEW','FLIES','FLIGHT','FLOATING','FLOOR','FLOW',
  'FLOWER','FLY','FOG','FOLKS','FOLLOW','FOOD','FOOT','FOOTBALL',
  'FOR','FORCE','FOREIGN','FOREST','FORGET','FORGOT','FORGOTTEN','FORM',
  'FORMER','FORT','FORTH','FORTY','FORWARD','FOUGHT','FOUND','FOUR',
  'FOURTH','FOX','FRAME','FREE','FREEDOM','FREQUENTLY','FRESH','FRIEND',
  'FRIENDLY','FRIGHTEN','FROG','FROM','FRONT','FROZEN','FRUIT','FUEL',
  'FULL','FULLY','FUN','FUNCTION','FUNNY','FUR','FURNITURE','FURTHER',
  'FUTURE','GAIN','GAME','GARAGE','GARDEN','GAS','GASOLINE','GATE',
  'GATHER','GAVE','GENERAL','GENERALLY','GENTLE','GENTLY','GET','GETTING',
  'GIANT','GIFT','GIRL','GIVE','GIVEN','GIVING','GLAD','GLASS',
  'GLOBE','GO','GOES','GOLD','GOLDEN','GONE','GOOD','GOOSE',
  'GOT','GOVERNMENT','GRABBED','GRADE','GRADUALLY','GRAIN','GRANDFATHER','GRANDMOTHER',
  'GRAPH','GRASS','GRAVITY','GRAY','GREAT','GREATER','GREATEST','GREATLY',
  'GREEN','GREW','GROUND','GROUP','GROW','GROWN','GROWTH','GUARD',
  'GUESS','GUIDE','GULF','GUN','HABIT','HAD','HAIR','HALF',
  'HALFWAY','HALL','HAND','HANDLE','HANDSOME','HANG','HAPPEN','HAPPENED',
  'HAPPILY','HAPPY','HARBOR','HARD','HARDER','HARDLY','HAS','HAT',
  'HAVE','HAVING','HAY','HE','HEADED','HEADING','HEALTH','HEARD',
  'HEARING','HEART','HEAT','HEAVY','HEIGHT','HELD','HELLO','HELP',
  'HELPFUL','HER','HERD','HERE','HERSELF','HIDDEN','HIDE','HIGH',
  'HIGHER','HIGHEST','HIGHWAY','HILL','HIM','HIMSELF','HIS','HISTORY',
  'HIT','HOLD','HOLE','HOLLOW','HOME','HONOR','HOPE','HORN',
  'HORSE','HOSPITAL','HOT','HOUR','HOUSE','HOW','HOWEVER','HUGE',
  'HUMAN','HUNDRED','HUNG','HUNGRY','HUNT','HUNTER','HURRIED','HURRY',
  'HURT','HUSBAND','ICE','IDEA','IDENTITY','IF','ILL','IMAGE',
  'IMAGINE','IMMEDIATELY','IMPORTANCE','IMPORTANT','IMPOSSIBLE','IMPROVE','IN','INCH',
  'INCLUDE','INCLUDING','INCOME','INCREASE','INDEED','INDEPENDENT','INDICATE','INDIVIDUAL',
  'INDUSTRIAL','INDUSTRY','INFLUENCE','INFORMATION','INSIDE','INSTANCE','INSTANT','INSTEAD',
  'INSTRUMENT','INTEREST','INTERIOR','INTO','INTRODUCED','INVENTED','INVOLVED','IRON',
  'IS','ISLAND','IT','ITS','ITSELF','JACK','JAR','JET',
  'JOB','JOIN','JOINED','JOURNEY','JOY','JUDGE','JUMP','JUNGLE',
  'JUST','KEEP','KEPT','KEY','KIDS','KILL','KIND','KITCHEN',
  'KNEW','KNIFE','KNOW','KNOWLEDGE','KNOWN','LABEL','LABOR','LACK',
  'LADY','LAID','LAKE','LAMP','LAND','LANGUAGE','LARGE','LARGER',
  'LARGEST','LAST','LATE','LATER','LAUGH','LAW','LAY','LAYERS',
  'LEAD','LEADER','LEAF','LEARN','LEAST','LEATHER','LEAVE','LEAVING',
  'LED','LEFT','LEG','LENGTH','LESSON','LET','LETTER','LEVEL',
  'LIBRARY','LIE','LIFE','LIFT','LIGHT','LIKE','LIKELY','LIMITED',
  'LINE','LION','LIPS','LIQUID','LIST','LISTEN','LITTLE','LIVE',
  'LIVING','LOAD','LOCAL','LOCATE','LOCATION','LOG','LONELY','LONG',
  'LONGER','LOOK','LOOSE','LOSE','LOSS','LOST','LOT','LOUD',
  'LOVE','LOVELY','LOW','LOWER','LUCK','LUCKY','LUNCH','LUNGS',
  'LYING','MACHINE','MACHINERY','MAD','MADE','MAGIC','MAGNET','MAIL',
  'MAIN','MAINLY','MAJOR','MAKE','MAKING','MAN','MANAGED','MANNER',
  'MANUFACTURING','MANY','MAP','MARK','MARKET','MARRIED','MASS','MASSAGE',
  'MASTER','MATERIAL','MATHEMATICS','MATTER','MAY','MAYBE','ME','MEAL',
  'MEAN','MEANS','MEANT','MEASURE','MEAT','MEDICINE','MEET','MELTED',
  'MEMBER','MEMORY','MEN','MENTAL','MERELY','MET','METAL','METHOD',
  'MICE','MIDDLE','MIGHT','MIGHTY','MILE','MILITARY','MILK','MILL',
  'MIND','MINE','MINERALS','MINUTE','MIRROR','MISSING','MISSION','MISTAKE',
  'MIX','MIXTURE','MODEL','MODERN','MOLECULAR','MOMENT','MONEY','MONKEY',
  'MONTH','MOOD','MOON','MORE','MORNING','MOST','MOSTLY','MOTHER',
  'MOTION','MOTOR','MOUNTAIN','MOUSE','MOUTH','MOVE','MOVEMENT','MOVIE',
  'MOVING','MUD','MUSCLE','MUSIC','MUSICAL','MUST','MY','MYSELF',
  'MYSTERIOUS','NAILS','NAME','NATION','NATIONAL','NATIVE','NATURAL','NATURALLY',
  'NATURE','NEAR','NEARBY','NEARER','NEAREST','NEARLY','NECESSARY','NECK',
  'NEEDED','NEEDLE','NEEDS','NEGATIVE','NEIGHBOR','NEIGHBORHOOD','NERVOUS','NEST',
  'NEVER','NEW','NEWS','NEWSPAPER','NEXT','NICE','NIGHT','NINE',
  'NO','NOBODY','NODDED','NOISE','NONE','NOON','NOR','NORTH',
  'NOSE','NOT','NOTE','NOTED','NOTHING','NOTICE','NOUN','NOW',
  'NUMBER','NUMERAL','NUTS','OBJECT','OBSERVE','OBTAIN','OCCASIONALLY','OCCUR',
  'OCEAN','OF','OFF','OFFER','OFFICE','OFFICER','OFFICIAL','OIL',
  'OLD','OLDER','OLDEST','ON','ONCE','ONE','ONLY','ONTO',
  'OPEN','OPERATION','OPINION','OPPORTUNITY','OPPOSITE','OR','ORANGE','ORBIT',
  'ORDER','ORDINARY','ORGANIZATION','ORGANIZED','ORIGIN','ORIGINAL','OTHER','OUGHT',
  'OUR','OURSELVES','OUT','OUTER','OUTLINE','OUTSIDE','OVER','OWN',
  'OWNER','OXYGEN','PACK','PACKAGE','PAGE','PAID','PAIN','PAINT',
  'PAIR','PALACE','PALE','PAN','PAPER','PARAGRAPH','PARALLEL','PARENT',
  'PARK','PART','PARTICLES','PARTICULAR','PARTICULARLY','PARTLY','PARTS','PARTY',
  'PASS','PASSAGE','PAST','PATH','PATTERN','PAY','PEACE','PEN',
  'PENCIL','PEOPLE','PER','PERCENT','PERFECT','PERFECTLY','PERHAPS','PERIOD',
  'PERSON','PERSONAL','PET','PHRASE','PHYSICAL','PIANO','PICK','PICTURE',
  'PICTURED','PIE','PIECE','PIG','PILE','PILOT','PINE','PINK',
  'PIPE','PITCH','PLACE','PLAIN','PLAN','PLANE','PLANET','PLANNED',
  'PLANNING','PLANT','PLASTIC','PLATE','PLATES','PLAY','PLEASANT','PLEASE',
  'PLEASURE','PLENTY','PLURAL','PLUS','POCKET','POEM','POET','POETRY',
  'POINT','POLE','POLICE','POLICEMAN','POLITICAL','POND','PONY','POOL',
  'POOR','POPULAR','POPULATION','PORCH','PORT','POSITION','POSITIVE','POSSIBLE',
  'POSSIBLY','POST','POT','POTATOES','POUND','POUR','POWDER','POWER',
  'POWERFUL','PRACTICAL','PRACTICE','PREPARE','PRESENT','PRESIDENT','PRESS','PRESSURE',
  'PRETTY','PREVENT','PREVIOUS','PRICE','PRIDE','PRIMITIVE','PRINCIPAL','PRINCIPLE',
  'PRINTED','PRIVATE','PRIZE','PROBABLY','PROBLEM','PROCESS','PRODUCE','PRODUCT',
  'PRODUCTION','PROGRAM','PROGRESS','PROMISED','PROPER','PROPERLY','PROPERTY','PROTECTION',
  'PROUD','PROVE','PROVIDE','PUBLIC','PULL','PUPIL','PURE','PURPLE',
  'PURPOSE','PUSH','PUT','PUTTING','QUARTER','QUEEN','QUESTION','QUICK',
  'QUICKLY','QUIET','QUIETLY','QUITE','RABBIT','RACE','RADIO','RAILROAD',
  'RAIN','RAISE','RAN','RANCH','RANGE','RAPIDLY','RATE','RATHER',
  'RAW','RAYS','REACH','READ','READER','READY','REAL','REALIZE',
  'REAR','REASON','RECALL','RECEIVE','RECENT','RECENTLY','RECOGNIZE','RECORD',
  'RED','REFER','REFUSED','REGION','REGULAR','RELATED','RELATIONSHIP','RELIGIOUS',
  'REMAIN','REMARKABLE','REMEMBER','REMOVE','REPEAT','REPLACE','REPLIED','REPORT',
  'REPRESENT','REQUIRE','RESEARCH','RESPECT','REST','RESULT','RETURN','REVIEW',
  'RHYME','RHYTHM','RICE','RICH','RIDE','RIDING','RIGHT','RING',
  'RISE','RISING','RIVER','ROAD','ROAR','ROCK','ROCKET','ROCKY',
  'ROD','ROLL','ROOF','ROOM','ROOT','ROPE','ROSE','ROUGH',
  'ROUND','ROUTE','ROW','RUBBED','RUBBER','RULE','RULER','RUN',
  'RUNNING','RUSH','SAD','SADDLE','SAFE','SAFETY','SAID','SAIL',
  'SALE','SALMON','SALT','SAME','SAND','SANG','SAT','SATELLITES',
  'SATISFIED','SAVE','SAVED','SAW','SAY','SCALE','SCARED','SCENE',
  'SCHOOL','SCIENCE','SCIENTIFIC','SCIENTIST','SCORE','SCREEN','SEA','SEARCH',
  'SEASON','SEAT','SECOND','SECRET','SECTION','SEE','SEED','SEEING',
  'SEEMS','SEEN','SELDOM','SELECT','SELECTION','SELL','SEND','SENSE',
  'SENT','SENTENCE','SEPARATE','SERIES','SERIOUS','SERVE','SERVICE','SETS',
  'SETTING','SETTLE','SETTLERS','SEVEN','SEVERAL','SHADE','SHADOW','SHAKE',
  'SHAKING','SHALL','SHALLOW','SHAPE','SHARE','SHARP','SHE','SHEEP',
  'SHEET','SHELF','SHELLS','SHELTER','SHINE','SHINNING','SHIP','SHIRT',
  'SHOE','SHOOT','SHOP','SHORE','SHORT','SHORTER','SHOT','SHOULD',
  'SHOULDER','SHOUT','SHOW','SHOWN','SHUT','SICK','SIDES','SIGHT',
  'SIGN','SIGNAL','SILENCE','SILENT','SILK','SILLY','SILVER','SIMILAR',
  'SIMPLE','SIMPLEST','SIMPLY','SINCE','SING','SINGLE','SINK','SISTER',
  'SIT','SITTING','SITUATION','SIX','SIZE','SKILL','SKIN','SKY',
  'SLABS','SLAVE','SLEEP','SLEPT','SLIDE','SLIGHT','SLIGHTLY','SLIP',
  'SLIPPED','SLOPE','SLOW','SLOWLY','SMALL','SMALLER','SMALLEST','SMELL',
  'SMILE','SMOKE','SMOOTH','SNAKE','SNOW','SO','SOAP','SOCIAL',
  'SOCIETY','SOFT','SOFTLY','SOIL','SOLAR','SOLD','SOLDIER','SOLID',
  'SOLUTION','SOLVE','SOME','SOMEBODY','SOMEHOW','SOMEONE','SOMETHING','SOMETIME',
  'SOMEWHERE','SON','SONG','SOON','SORT','SOUND','SOURCE','SOUTH',
  'SOUTHERN','SPACE','SPEAK','SPECIAL','SPECIES','SPECIFIC','SPEECH','SPEED',
  'SPELL','SPEND','SPENT','SPIDER','SPIN','SPIRIT','SPITE','SPLIT',
  'SPOKEN','SPORT','SPREAD','SPRING','SQUARE','STAGE','STAIRS','STAND',
  'STANDARD','STAR','STARED','START','STATE','STATEMENT','STATION','STAY',
  'STEADY','STEAM','STEEL','STEEP','STEMS','STEP','STEPPED','STICK',
  'STIFF','STILL','STOCK','STOMACH','STONE','STOOD','STOP','STOPPED',
  'STORE','STORM','STORY','STOVE','STRAIGHT','STRANGE','STRANGER','STRAW',
  'STREAM','STREET','STRENGTH','STRETCH','STRIKE','STRING','STRIP','STRONG',
  'STRONGER','STRUCK','STRUCTURE','STRUGGLE','STUCK','STUDENT','STUDIED','STUDYING',
  'SUBJECT','SUBSTANCE','SUCCESS','SUCCESSFUL','SUCH','SUDDEN','SUDDENLY','SUGAR',
  'SUGGEST','SUIT','SUM','SUMMER','SUN','SUNLIGHT','SUPPER','SUPPLY',
  'SUPPORT','SUPPOSE','SURE','SURFACE','SURPRISE','SURROUNDED','SWAM','SWEET',
  'SWEPT','SWIM','SWIMMING','SWING','SWUNG','SYLLABLE','SYMBOL','SYSTEM',
  'TABLE','TAIL','TAKE','TAKEN','TALES','TALK','TALL','TANK',
  'TAPE','TASK','TASTE','TAUGHT','TAX','TEA','TEACH','TEACHER',
  'TEAM','TEARS','TEETH','TELEPHONE','TELEVISION','TELL','TEMPERATURE','TEN',
  'TENT','TERM','TERRIBLE','TEST','THAN','THANK','THAT','THEE',
  'THEM','THEMSELVES','THEN','THEORY','THERE','THEREFORE','THESE','THEY',
  'THICK','THIN','THING','THINK','THIRD','THIRTY','THIS','THOSE',
  'THOU','THOUGH','THOUGHT','THOUSAND','THREAD','THREE','THREW','THROAT',
  'THROUGH','THROUGHOUT','THROW','THROWN','THUMB','THUS','THY','TIDE',
  'TIE','TIGHT','TIGHTLY','TILL','TIME','TIN','TINY','TIP',
  'TIRED','TITLE','TO','TOBACCO','TODAY','TOGETHER','TOLD','TOMORROW',
  'TONE','TONGUE','TONIGHT','TOO','TOOK','TOOL','TOP','TOPIC',
  'TORN','TOTAL','TOUCH','TOWARD','TOWER','TOWN','TOY','TRACE',
  'TRACK','TRADE','TRAFFIC','TRAIL','TRAIN','TRANSPORTATION','TRAP','TRAVEL',
  'TREATED','TREE','TRIANGLE','TRIBE','TRICK','TRIED','TRIP','TROOPS',
  'TROPICAL','TROUBLE','TRUCK','TRUNK','TRUTH','TRY','TUBE','TUNE',
  'TURN','TWELVE','TWENTY','TWICE','TWO','TYPE','TYPICAL','UNCLE',
  'UNDER','UNDERLINE','UNDERSTANDING','UNHAPPY','UNION','UNIT','UNIVERSE','UNKNOWN',
  'UNLESS','UNTIL','UNUSUAL','UP','UPON','UPPER','UPWARD','US',
  'USE','USEFUL','USING','USUAL','USUALLY','VALLEY','VALUABLE','VALUE',
  'VAPOR','VARIETY','VARIOUS','VAST','VEGETABLE','VERB','VERTICAL','VERY',
  'VESSELS','VICTORY','VIEW','VILLAGE','VISIT','VISITOR','VOICE','VOLUME',
  'VOTE','VOWEL','VOYAGE','WAGON','WAIT','WALK','WALL','WANT',
  'WAR','WARM','WARN','WAS','WASH','WASTE','WATCH','WATER',
  'WAVE','WAY','WE','WEAK','WEALTH','WEAR','WEATHER','WEEK',
  'WEIGH','WEIGHT','WELCOME','WELL','WENT','WERE','WEST','WESTERN',
  'WET','WHALE','WHAT','WHATEVER','WHEAT','WHEEL','WHEN','WHENEVER',
  'WHERE','WHEREVER','WHETHER','WHICH','WHILE','WHISPERED','WHISTLE','WHITE',
  'WHO','WHOLE','WHOM','WHOSE','WHY','WIDE','WIDELY','WIFE',
  'WILD','WILL','WILLING','WIN','WIND','WINDOW','WING','WINTER',
  'WIRE','WISE','WISH','WITH','WITHIN','WITHOUT','WOLF','WOMEN',
  'WON','WONDER','WONDERFUL','WOOD','WOODEN','WOOL','WORD','WORE',
  'WORK','WORKER','WORLD','WORRIED','WORRY','WORSE','WORTH','WOULD',
  'WRAPPED','WRITE','WRITER','WRITING','WRITTEN','WRONG','WROTE','YARD',
  'YEAR','YELLOW','YES','YESTERDAY','YET','YOU','YOUNG','YOUNGER',
  'YOUR','YOURSELF','YOUTH','ZERO','ZOO'];
    return list;
  }
  
  render(){

    let letters = [];
    let board;
    this.state.activeSelectedWord.map((current, index) =>{
      let correct;
      if(this.state.activeLetters[index] === undefined){
        correct='undefined'
      }
      else if(this.state.activeLetters[index] === current){
        correct='true'
      }
      else{
        correct='false'
      }
      letters.push(<span className="game-letter" key={index} data-correct={correct}>{current}</span>)
    });
    if(!this.state.gameStart){
      board=(
         <div className="game__board" key="start">
          <p>{'Type as many words as you can before the time runs out.'}</p>
          <button className="button" onClick={this.startGame}>Start</button>
         </div>);
    }
    else if(this.state.timer && this.state.gameStart){
       board=(
         <>
        <Container>
        <Row className="d-flex board-score" lg="12">
          <Col lg="4" className="p-2">
            <div className="oval">
            <h5 className="pt-2">{'LEVEL'+this.state.level}</h5>
            </div>
            </Col>
            <Col lg="4" className="p-2">
            <div className="trapezoid">
            <h5 className="pt-2">{'SCORE: '+ this.state.wordsMastered}</h5>
              </div>
            </Col >
            <Col lg="4" className="p-2" >
            <div className="rhombus">
              <div><h5>{'TIME:' + this.state.timer}</h5></div>
            </div>
            </Col>
         </Row>
         </Container>
         <div className="game__board" key="inprogress">
           <CSSTransition transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
           <div className="game__words pt-4" key={this.state.activeSelectedWord}>{letters}</div>
           </CSSTransition>
         </div>
         </>
         );
    }
    else{
      board=(
        <div className="game__board" key="timesup">
          <div className="game__words">
            <p>{'TIME IS UP!'}</p>
            <p>{'FINAL SCORE: ' + this.state.wordsMastered}<span className="emoji">{this.rating()}</span></p>
            <button className="button" onClick={this.startGame}>{'Play Again'}</button>
            <button className="button" type="button" onClick={(e)=>this.submitForm(e)}>save Results </button>
          </div>
        </div>
      )
    }

    return(
      <Row className="game">
        <CSSTransition transitionName='scale' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {board}
        </CSSTransition>
         <input className="secret-input" type="text"/>
       
        </Row>
    );
  }
}

GameComponent.propTypes = {
  GetAllResults: PropTypes.func,
  results: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  results: state.results.results,
  resultsError: state.results.resultsError,
});

// export default Results
export default withRouter(connect(mapStateToProps, {
  AddNewResults,GetAllResults
})(GameComponent));